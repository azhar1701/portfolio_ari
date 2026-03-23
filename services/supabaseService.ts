// @ts-nocheck
import { supabase } from '../lib/supabase';
import { portfolioData as staticPortfolioData } from '../data/portfolioData';
import type { PortfolioData, Testimonial, BlogPost, GalleryImage } from '../types';

export class SupabaseService {
  // Portfolio Data Operations
  static async getPortfolioData(): Promise<PortfolioData> {
    const [profileRes, portfolioRes, testimonialsRes, blogRes, galleryRes] = await Promise.all([
      // @ts-ignore
      supabase.from('profiles').select('*').maybeSingle(),
      // @ts-ignore
      supabase.from('portfolio_data').select('*').maybeSingle(),
      // @ts-ignore
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      // @ts-ignore
      supabase.from('blog_posts').select('*').order('date', { ascending: false }),
      // @ts-ignore
      supabase.from('gallery').select('*').order('created_at', { ascending: false })
    ]);

    if (profileRes.error) {
      console.warn('Error fetching profile from Supabase:', profileRes.error);
    }
    if (portfolioRes.error) {
      console.warn('Error fetching portfolio data from Supabase:', portfolioRes.error);
    }
    if (testimonialsRes.error) throw testimonialsRes.error;
    if (blogRes.error) throw blogRes.error;
    if (galleryRes.error) throw galleryRes.error;

    // Use default data if Supabase is completely empty (unseeded)
    if (!profileRes.data && !portfolioRes.data) {
      return staticPortfolioData;
    }

    const profileData = profileRes.data || staticPortfolioData.profile;
    const portfolioDataRow = portfolioRes.data || { summary: staticPortfolioData.summary, data: {} };
    const blogData = blogRes.data || [];
    const galleryData = galleryRes.data || [];
    const testimonialsData = testimonialsRes.data || [];

    // The data field in portfolioDataRow contains the rest of the portfolio structure
    const portfolioData = (portfolioDataRow as any).data || {};

    return {
      profile: {
        name: profileData.name,
        title: profileData.title,
        location: profileData.location,
        phone: profileData.phone,
        email: profileData.email,
        socials: profileData.socials as any
      },
      summary: portfolioDataRow.summary,
      testimonials: (testimonialsData || []).map(t => ({
        id: t.id,
        name: t.name,
        role: t.role || undefined,
        company: t.company,
        content: t.content,
        rating: t.rating,
        avatar: t.avatar || undefined
      })),
      blogPosts: (blogData || []).map(b => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        date: b.date,
        author: b.author || undefined,
        category: b.category || undefined,
        image: b.image || undefined,
        readTime: b.read_time,
        featured: b.featured,
        tags: b.tags || []
      })),
      gallery: (galleryData || []).map(g => ({
        id: g.id,
        title: g.title,
        description: g.description,
        image: g.image,
        category: g.category,
        projectId: g.project_id || undefined
      })),
      ...portfolioData
    };
  }

  // Storage Operations
  static async uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  static async savePortfolioData(data: PortfolioData): Promise<void> {
    const { profile, summary, testimonials, blogPosts, gallery, ...portfolioData } = data;

    // Save profile
    const { error: profileError } = await supabase
      // @ts-ignore
      .from('profiles')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        ...profile
      });
    if (profileError) throw profileError;

    // Save portfolio data
    const { error: portfolioError } = await supabase
      // @ts-ignore
      .from('portfolio_data')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        summary,
        data: portfolioData
      });
    if (portfolioError) throw portfolioError;

    // Save testimonials, blog posts, and gallery
    await Promise.all([
      this.saveTestimonials(testimonials),
      this.saveBlogPosts(blogPosts),
      this.saveGallery(gallery)
    ]);
  }

  // Testimonials Operations
  static async saveTestimonials(testimonials: Testimonial[]): Promise<void> {
    // Delete existing
    await supabase.from('testimonials').delete().neq('id', '');

    if (testimonials.length > 0) {
      // @ts-ignore
      const { error } = await supabase.from('testimonials').insert(
        testimonials.map(t => ({
          id: t.id || crypto.randomUUID(),
          name: t.name,
          role: t.role,
          company: t.company,
          content: t.content,
          rating: t.rating,
          avatar: t.avatar
        }))
      );
      if (error) throw error;
    }
  }

  // Blog Posts Operations
  static async saveBlogPosts(blogPosts: BlogPost[]): Promise<void> {
    // Delete existing
    await supabase.from('blog_posts').delete().neq('id', '');

    if (blogPosts.length > 0) {
      // @ts-ignore
      const { error } = await supabase.from('blog_posts').insert(
        blogPosts.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: post.date,
          author: post.author,
          category: post.category,
          image: post.image,
          read_time: post.readTime,
          featured: post.featured || false,
          tags: post.tags || []
        }))
      );
      if (error) throw error;
    }
  }

  // Gallery Operations
  static async saveGallery(gallery: GalleryImage[]): Promise<void> {
    // Delete existing
    await supabase.from('gallery').delete().neq('id', '');

    if (gallery.length > 0) {
      // @ts-ignore
      const { error } = await supabase.from('gallery').insert(
        gallery.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category,
          project_id: item.projectId
        }))
      );
      if (error) throw error;
    }
  }
}