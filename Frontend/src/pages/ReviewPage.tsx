import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/api";
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  // Load an existing review for this order from the server
  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    API.get(`/api/reviews/order/${orderId}`)
      .then(({ data }) => {
        if (data) {
          setRating(data.rating);
          setReview(data.review);
          setSubmitted(true);
        }
      })
      .catch(() => {
        // if the lookup fails, the user can still try to submit
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold mb-2">No order selected</h2>
        <p className="text-muted-foreground font-body mb-6">Rate an order from your order history.</p>
        <Button onClick={() => navigate("/profile")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Go to My Orders
        </Button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }

    if (review.trim().length < 5) {
      toast({ title: "Please write at least a short review", variant: "destructive" });
      return;
    }

    try {
      await API.post("/api/reviews", {
        orderId,
        rating,
        review: review.trim(),
      });

      setSubmitted(true);
      toast({ title: "Review submitted successfully 🎉" });
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Failed to submit review",
        variant: "destructive",
      });
    }
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
          <p className="text-sm text-muted-foreground font-body mb-6">
            Order: <span className="font-semibold text-foreground">#{orderId.slice(-6)}</span>
          </p>

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
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
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
            aria-label="Your review"
            className="min-h-[120px] font-body text-sm mb-2"
          />
          <p className="text-xs text-muted-foreground font-body text-right mb-6">
            {review.length}/1000
          </p>

          {loading ? null : !submitted ? (
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
