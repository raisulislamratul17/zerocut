import { NextResponse } from 'next/server'

export async function GET() {
  // Mock analytics data - in production, this would connect to real analytics
  const stats = {
    overview: {
      totalViews: 24847,
      viewsChange: 12.5,
      uniqueVisitors: 18423,
      visitorsChange: 8.3,
      avgSessionDuration: '3:42',
      sessionChange: -2.1,
      bounceRate: 34.2,
      bounceChange: -5.8,
    },
    traffic: {
      daily: [
        { date: 'Mon', visitors: 1240, views: 1890 },
        { date: 'Tue', visitors: 1380, views: 2100 },
        { date: 'Wed', visitors: 1520, views: 2340 },
        { date: 'Thu', visitors: 1680, views: 2580 },
        { date: 'Fri', visitors: 1890, views: 2920 },
        { date: 'Sat', visitors: 1420, views: 2180 },
        { date: 'Sun', visitors: 1180, views: 1820 },
      ],
      sources: [
        { name: 'Direct', value: 42, color: '#84B179' },
        { name: 'Organic', value: 28, color: '#A2CB8B' },
        { name: 'Social', value: 18, color: '#C7EABB' },
        { name: 'Referral', value: 12, color: '#4A7A42' },
      ],
    },
    projects: [
      { id: 1, title: 'Meridian', views: 4521, engagement: 78, status: 'featured' },
      { id: 2, title: 'Void', views: 3892, engagement: 82, status: 'featured' },
      { id: 3, title: 'Pulse', views: 3156, engagement: 65, status: 'active' },
      { id: 4, title: 'Echoes', views: 2847, engagement: 71, status: 'active' },
      { id: 5, title: 'Frame', views: 2234, engagement: 58, status: 'active' },
      { id: 6, title: 'Shift', views: 1978, engagement: 63, status: 'active' },
    ],
    recentActivity: [
      { type: 'view', project: 'Meridian', time: '2 min ago' },
      { type: 'contact', message: 'New inquiry from brand@company.com', time: '15 min ago' },
      { type: 'view', project: 'Void', time: '23 min ago' },
      { type: 'share', project: 'Pulse', platform: 'Instagram', time: '1 hour ago' },
      { type: 'view', project: 'Echoes', time: '1 hour ago' },
      { type: 'contact', message: 'Portfolio request from studio@agency.com', time: '2 hours ago' },
    ],
    geographic: [
      { country: 'United States', visitors: 8420, percentage: 45 },
      { country: 'United Kingdom', visitors: 2340, percentage: 13 },
      { country: 'Germany', visitors: 1820, percentage: 10 },
      { country: 'France', visitors: 1450, percentage: 8 },
      { country: 'Canada', visitors: 1280, percentage: 7 },
      { country: 'Other', visitors: 3113, percentage: 17 },
    ],
  }

  return NextResponse.json(stats)
}
