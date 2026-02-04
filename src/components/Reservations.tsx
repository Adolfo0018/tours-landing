import { useState, useMemo, useEffect } from "react";
import { Calendar } from "react-date-range";
import { differenceInCalendarDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { getPromotions, type Promotion } from "../data/promotions";
import { applyPromotion } from "../utils/applyPromotion";

interface Props {
  price: number;
  title: string;
  tourId: number;
}

const Reservations = ({ price, title, tourId }: Props) => {
  const today = new Date();
  const navigate = useNavigate();

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  const [range, setRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    getPromotions().then(setPromotions);
  }, []);

  const totalPeople = adults + kids;

  const days = Math.max(
    1,
    differenceInCalendarDays(
      range[0].endDate as Date,
      range[0].startDate as Date
    )
  );

  const baseTotal = useMemo(() => {
    return totalPeople * price * days;
  }, [totalPeople, price, days]);

  const finalTotal = useMemo(() => {
    if (!promoCode) return baseTotal;

    return applyPromotion(
      tourId,
      promoCode,
      baseTotal,
      promotions
    );
  }, [baseTotal, promoCode, promotions, tourId]);

  const discount = baseTotal - finalTotal;

  useEffect(() => {
    if (!promoCode) {
      setPromoMessage(null);
      return;
    }

    if (discount > 0) {
      setPromoMessage("✅ Promotion code applied!");
    } else {
      setPromoMessage("❌ Invalid code for this tour");
    }
  }, [promoCode, discount]);


  return (
    <div className="card shadow-sm p-3">
      <h4>
        ${price} <small className="text-muted">per person / day</small>
      </h4>

      {/* Adults */}
      <div className="mb-3">
        <label className="form-label">Adults</label>
        <input
          type="number"
          min={1}
          className="form-control"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
      </div>

      {/* Kids */}
      <div className="mb-3">
        <label className="form-label">Kids</label>
        <input
          type="number"
          min={0}
          className="form-control"
          value={kids}
          onChange={(e) => setKids(Number(e.target.value))}
        />
      </div>

      {/* Date */}
      <div className="mb-3">
        <label className="form-label">Select date</label>
        <Calendar
          date={range[0].startDate}
          onChange={(date) =>
            setRange([{ startDate: date, endDate: date, key: "selection" }])
          }
          minDate={today}
        />
      </div>

      {/* Promo code */}
      <div className="mb-3">
        <label className="form-label">Promotion code</label>
        <input
          type="text"
          className="form-control"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter code"
        />
      </div>

      {promoMessage && (
        <div
          className={`mt-2 small ${
            discount > 0 ? "text-success" : "text-danger"
          }`}
        >
          {promoMessage}
        </div>
      )}

      {/* Summary */}
      <div className="border-top pt-3 mb-3">
        <div className="d-flex justify-content-between">
          <span>People</span>
          <span>{totalPeople}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Days</span>
          <span>{days}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>${baseTotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="d-flex justify-content-between text-success">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="d-flex justify-content-between fw-semibold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="btn btn-success w-100"
        onClick={() =>
          navigate("/checkout", {
            state: {
              title,
              people: totalPeople,
              startDate: format(range[0].startDate as Date, "yyyy-MM-dd"),
              endDate: format(range[0].endDate as Date, "yyyy-MM-dd"),
              total: finalTotal.toFixed(2),
              promoCode,
            },
          })
        }
      >
        Reserve now
      </button>
    </div>
  );
};

export default Reservations;