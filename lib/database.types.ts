export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          title: string
          location: string
          phone: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          location: string
          phone: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          location?: string
          phone?: string
          email?: string
          updated_at?: string
        }
      }
      portfolio_data: {
        Row: {
          id: string
          summary: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          summary: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          summary?: string
          data?: Json
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          company: string
          content: string
          rating: number
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          company: string
          content: string
          rating: number
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          company?: string
          content?: string
          rating?: number
          avatar?: string | null
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          date: string
          author: string | null
          category: string | null
          image: string | null
          read_time: number
          featured: boolean
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          date: string
          author?: string | null
          category?: string | null
          image?: string | null
          read_time: number
          featured?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          date?: string
          author?: string | null
          category?: string | null
          image?: string | null
          read_time?: number
          featured?: boolean
          tags?: string[] | null
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          category: string
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          category: string
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          category?: string
          project_id?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}