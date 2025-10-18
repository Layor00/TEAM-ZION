import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <Heart className="w-24 h-24 text-destructive fill-destructive pulse-heart" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-1 overflow-hidden">
              <svg className="w-full h-full ecg-wave" viewBox="0 0 100 20">
                <polyline
                  points="0,10 20,10 25,5 30,15 35,10 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-destructive"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Hello Doctor</h1>
          <p className="text-muted-foreground">Your healthcare companion</p>
        </div>

        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
