import VideoCard from '@/components/dashboard/VideoCard'
import ProductDemo from '@/components/dashboard/ProductDemo'
import GridsTable from '@/components/dashboard/GridsTable'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VideoCard />
        <ProductDemo />
      </div>
      <GridsTable />
    </div>
  )
}