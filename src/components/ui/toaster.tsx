import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/lib/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className="font-fira-code bg-onyx text-silver border border-graphite py-4"
            key={id}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-silver text-xs uppercase">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-indigo text-xs mt-0.5">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
