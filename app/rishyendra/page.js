'use client';

import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function RishyendraPage() {
  const [views, setViews] = useState(0)

  useEffect(() => {
    async function incrementViews() {
        let { data: oldData, error: fetchError } = await supabase.from('betoes').select('views').eq('name', 'Rishyendra')

        if (fetchError) {
            console.error('Error fetching views:', fetchError)
            return
        }
        const oldViews = oldData?.[0]?.views || 0
        const newViews = oldViews + 1

        const { data, error } = await supabase.from('betoes').upsert({ name: 'Rishyendra', views: newViews}).select()

        if (error) {
            console.error('Error updating views:', error)
        } else if (data && data.length > 0) {
            setViews(data[0].views)
        }
    }

        incrementViews()
  }, [])

  return (
    <div>
      <h1>Rishyendra</h1>
      <p>Views: {views}</p>
    </div>
  )
}