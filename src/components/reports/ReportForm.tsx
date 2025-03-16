import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  lightId: z.string().min(1, { message: "Light ID is required" }),
  issueType: z.string().min(1, { message: "Issue type is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500),
  photo: z.any().optional(),
});

type ReportFormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ReportFormValues) => void;
  location?: { lat: number; lng: number };
}

const ReportForm = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
  location = { lat: 40.7128, lng: -74.006 }, // Default to NYC coordinates
}: ReportFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lightId: "",
      issueType: "",
      description: "",
    },
  });

  const handleSubmit = (data: ReportFormValues) => {
    // Add location data to the form submission
    const reportData = {
      ...data,
      location,
    };
    onSubmit(reportData);
    form.reset();
    setPhotoPreview(null);
    onOpenChange(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("photo", file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Laporkan Masalah Lampu Jalan</DialogTitle>
          <DialogDescription>
            Harap berikan detail tentang masalah lampu jalan yang Anda amati.
            Laporan Anda akan membantu menjaga keamanan publik di komunitas
            Anda.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="lightId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Lampu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan ID lampu jalan (mis., SL-12345)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ID biasanya terletak pada tiang lampu jalan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Masalah</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis masalah" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not_working">
                        Lampu Tidak Berfungsi
                      </SelectItem>
                      <SelectItem value="flickering">Lampu Berkedip</SelectItem>
                      <SelectItem value="damaged">
                        Tiang atau Perlengkapan Rusak
                      </SelectItem>
                      <SelectItem value="exposed_wires">
                        Kabel Terekspos
                      </SelectItem>
                      <SelectItem value="other">Masalah Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Harap jelaskan masalah secara detail"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Foto (Opsional)</FormLabel>
                  <div className="flex flex-col items-center gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                        {...field}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("photo")?.click()
                          }
                          className="w-full"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Unggah Foto
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            // This would trigger the device camera in a real implementation
                            document.getElementById("photo")?.click();
                          }}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {photoPreview && (
                      <div className="relative w-full max-w-sm overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-48 w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPhotoPreview(null);
                            form.setValue("photo", undefined);
                          }}
                        >
                          Hapus
                        </Button>
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    Unggah foto lampu jalan untuk membantu tim pemeliharaan
                    mengidentifikasi masalah.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">
                Lokasi: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit">Kirim Laporan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;
