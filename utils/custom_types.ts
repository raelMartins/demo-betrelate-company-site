export type ImagePickerType = {
  imageFile: any;
  imagePreview: string;
  dimensions: {
    height: string | number;
    width: string | number;
  };
};

export type NotificationType = {
  content: string | null;
  createdAt: string;
  id: string;
  entityId: string;
  read: boolean;
  title: string;
  type: string;
};
