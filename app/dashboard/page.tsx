import VideoCard from '@/components/dashboard/VideoCard'
import ProductDemo from '@/components/dashboard/ProductDemo'
import GridsTable from '@/components/dashboard/GridsTable'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-300">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, Tim!
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Here&apos;s your daily scoop on Bitscale!
        </p>
      </div>

      {/* Top cards row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VideoCard />
        <ProductDemo />
      </div>

      {/* Grids table */}
      <GridsTable />
    </div>
  )
}