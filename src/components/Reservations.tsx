import { useState, useMemo } from "react";
import { Calendar  } from "react-date-range";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  price: number;
  title: string;
}

const Reservations = ({ price, title }: Props) => {
  const today = new Date();

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  const [range, setRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ]);

  const totalPeople = adults + kids;

  const days = Math.max(
    1,
    differenceInCalendarDays(
      range[0].endDate as Date,
      range[0].startDate as Date
    )
  );

  const total = useMemo(() => {
    return totalPeople * price * days;
  }, [totalPeople, price, days]);

  const navigate = useNavigate();

  return (
    <div className="card shadow-sm p-3">

      <h4>${price} <small className="text-muted">per person / day</small></h4>

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

      {/* Date range */}
      <div className="mb-3">
        <label className="form-label">Select dates</label>
        <Calendar
          date={range[0].startDate}
          onChange={(date) =>
            setRange([{ startDate: date, endDate: date, key: "selection" }])
          }
          minDate={today}
        />
      </div>

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

        <div className="d-flex justify-content-between fw-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>

    <button
    className="btn btn-success w-100"
    onClick={() =>
        navigate("/checkout", {
        state: {
            title: title,
            people: totalPeople,
            startDate: format(range[0].startDate as Date, "yyyy-MM-dd"),
            endDate: format(range[0].endDate as Date, "yyyy-MM-dd"),
            total: total.toFixed(2),
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