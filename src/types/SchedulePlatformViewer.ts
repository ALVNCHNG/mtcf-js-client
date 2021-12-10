export interface SchedulePlatformViewer {
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export type SchedulePlatformViewerSortableFields = keyof SchedulePlatformViewer;

export type SchedulePlatformViewerRequestBody = {
  count: number;
};
