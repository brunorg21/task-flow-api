export interface ITaskCreate {
  title: string;
  createdAt: Date;
  userId: string;
  organizationId: string | null;
  assignedId: string;
  status: "In Progress" | "Completed" | "Canceled";
  attachment: File | null;
  noteId: string | null;
}
export interface ITask {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  organizationId: string | null;
  assignedId: string;
  status: "In Progress" | "Completed" | "Canceled";
  attachment: File | null;
  noteId: string | null;
}
