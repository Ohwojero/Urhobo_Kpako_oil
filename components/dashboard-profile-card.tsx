'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react'
import type { Profile } from '@/lib/supabase'

interface ProfileCardProps {
  profile: Profile | null
  isLoading: boolean
  onEdit: () => void
}

export function ProfileCard({ profile, isLoading, onEdit }: ProfileCardProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{profile?.full_name || 'User'}</h2>
            <p className="text-muted-foreground">{profile?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-foreground font-medium">{profile?.email}</p>
          </div>
        </div>

        {profile?.phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-foreground font-medium">{profile.phone}</p>
            </div>
          </div>
        )}

        {(profile?.address || profile?.city || profile?.state) && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-foreground font-medium">
                {profile?.address}
                {profile?.city && `, ${profile.city}`}
                {profile?.state && `, ${profile.state}`}
                {profile?.postal_code && ` ${profile.postal_code}`}
              </p>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground pt-4 border-t border-border">
          <p>
            Member since{' '}
            {new Date(profile?.created_at || '').toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </Card>
  )
}
