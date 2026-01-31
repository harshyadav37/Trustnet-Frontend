import { Skeleton } from '@/app/components/ui/skeleton';
import { Card } from '@/app/components/ui/card';

export function FeedSkeleton() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex gap-3 mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CommunitySkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-32 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
