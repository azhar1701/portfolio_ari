import { supabase } from '../lib/supabase';
import type { PortfolioData, Testimonial, BlogPost, GalleryImage } from '../types';

export class SupabaseService {
  // Portfolio Data Operations
  static async getPortfolioData(): Promise<PortfolioData> {
    const [profileRes, portfolioRes, testimonialsRes, blogRes, galleryRes] = await Promise.all([
      supabase.from('profiles').select('*').single(),
      supabase.from('portfolio_data').select('*').single(),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('blog_posts').select('*').order('date', { ascending: false }),
      supabase.from('gallery').select('*').order('created_at', { ascending: false })
    ]);

    if (profileRes.error) throw profileRes.error;
    if (portfolioRes.error) throw portfolioRes.error;
    if (testimonialsRes.error) throw testimonialsRes.error;
    if (blogRes.error) throw blogRes.error;
    if (galleryRes.error) throw galleryRes.error;

    const portfolioData = portfolioRes.data.data as any;
    
    return {
      profile: {
        name: profileRes.data.name,
        title: profileRes.data.title,
        location: profileRes.data.location,
        phone: profileRes.data.phone,
        email: profileRes.data.email
      },
      summary: portfolioRes.data.summary,
      testimonials: testimonialsRes.data.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        company: t.company,
        content: t.content,
        rating: t.rating,
        avatar: t.avatar
      })),
      blogPosts: blogRes.data.map(b => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        date: b.date,
        author: b.author,
        category: b.category,
        image: b.image,
        readTime: b.read_time,
        featured: b.featured,
        tags: b.tags || []
      })),
      gallery: galleryRes.data.map(g => ({
        id: g.id,
        title: g.title,
        description: g.description,
        image: g.image,
        category: g.category,
        projectId: g.project_id
      })),
      ...portfolioData
    };
  }

  static async savePortfolioData(data: PortfolioData): Promise<void> {
    const { profile, summary, testimonials, blogPosts, gallery, ...portfolioData } = data;

    // Save profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        ...profile
      });
    if (profileError) throw profileError;

    // Save portfolio data
    const { error: portfolioError } = await supabase
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