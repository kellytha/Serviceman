import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Search artisans by skills, name, or location
    // Note: This assumes you have additional fields in your Artisan model
    // For now, we'll search in the User model where role is ARTISAN
    const artisans = await prisma.user.findMany({
      where: {
        role: 'ARTISAN',
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive'
            }
          },
          // If you add skills/location fields later, add them here
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isVerified: true,
        // Add other fields as they become available
      },
      take: 20 // Limit results
    });

    // Transform to match the expected format
    const formattedArtisans = artisans.map(artisan => ({
      id: artisan.id,
      firstName: artisan.firstName,
      lastName: artisan.lastName,
      skills: ['General Services'], // Placeholder - you'll need to add this to your schema
      rating: 4.5, // Placeholder - you'll need to add this to your schema
      location: 'Nigeria', // Placeholder - you'll need to add this to your schema
      verified: artisan.isVerified
    }));

    return NextResponse.json(formattedArtisans);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}