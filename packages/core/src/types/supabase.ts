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
      task: {
        Row: {
          color: string
          created_at: string
          description: string
          id: number
          last_client_code: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          color: string
          created_at?: string
          description: string
          id?: number
          last_client_code?: string | null
          status: string
          title: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          id?: number
          last_client_code?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          department: string
          firstname: string
          id: number
          image: string
          lastname: string
          username: string
        }
        Insert: {
          created_at?: string
          department: string
          firstname: string
          id?: number
          image: string
          lastname: string
          username: string
        }
        Update: {
          created_at?: string
          department?: string
          firstname?: string
          id?: number
          image?: string
          lastname?: string
          username?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
