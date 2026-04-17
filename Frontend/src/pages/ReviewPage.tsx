import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, ArrowLeft, Send } from "lucide-react";

const ReviewPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order") || "";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kulfiwala_current_user");
    if (!stored) {
      navigate("/login");
    }
  }, [navigate]);

  // Check if already reviewed
  useEffect(() => {
    if (orderId) {
      const reviews = JSON.parse(localStorage.getItem("kulfiwala_reviews") || "[]");
      const existing = reviews.find((r: any) => r.orderId === orderId);
      if (existing) {
        setRating(existing.rating);
        setReview(existing.review);
        setSubmitted(true);
      }
    }
  }, [orderId]);

  const handleSubmit = () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (review.trim().length < 5) {
      toast({ title: "Please write at least a short review", variant: "destructive" });
      return;
    }

    const user = JSON.parse(localStorage.getItem("kulfiwala_current_user") || "{}");
    const reviewData = {
      orderId,
      rating,
      review: review.trim().slice(0, 1000),
      userName: user.name,
      date: new Date().toISOString(),
    };

    const reviews = JSON.parse(localStorage.getItem("kulfiwala_reviews") || "[]");
    const idx = reviews.findIndex((r: any) => r.orderId === orderId);
    if (idx >= 0) {
      reviews[idx] = reviewData;
    } else {
      reviews.push(reviewData);
    }
    localStorage.setItem("kulfiwala_reviews", JSON.stringify(reviews));

    setSubmitted(true);
    toast({ title: "Thank you for your review! 🎉" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/profile")}
          className="mb-6 font-body gap-1 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-up text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">
            {submitted ? "Review Submitted!" : "Rate Your Order"}
          </h1>
          {orderId && (
            <p className="text-sm text-muted-foreground font-body mb-6">
              Order: <span className="font-semibold text-foreground">{orderId}</span>
            </p>
          )}

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={submitted}
                onClick={() => setRating(star)}
                onMouseEnter={() => !submitted && setHover(star)}
                onMouseLeave={() => !submitted && setHover(0)}
                className="transition-transform hover:scale-110 disabled:cursor-default"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    star <= (hover || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-sm font-body text-muted-foreground mb-4">
              {rating === 1 && "Poor 😞"}
              {rating === 2 && "Fair 😐"}
              {rating === 3 && "Good 🙂"}
              {rating === 4 && "Great 😊"}
              {rating === 5 && "Amazing! 🤩"}
            </p>
          )}

          {/* Review Text */}
          <Textarea
            placeholder="Tell us about your experience with this order..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            disabled={submitted}
            maxLength={1000}
            className="min-h-[120px] font-body text-sm mb-2"
          />
          <p className="text-xs text-muted-foreground font-body text-right mb-6">
            {review.length}/1000
          </p>

          {!submitted ? (
            <Button
              onClick={handleSubmit}
              className="w-full font-body font-bold gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" /> Submit Review
            </Button>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-sm font-body text-muted-foreground">
                Your review has been saved. Thank you for your feedback!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
