import React, { useEffect, useState } from "react";
import { fetchMetrics } from "../services/apiClient";
import { VariantMetrics } from "../types/models";

const POLL_INTERVAL_MS = 5000;

const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<VariantMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = () => {
    fetchMetrics()
      .then((data) => {
        setMetrics(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load metrics");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading metrics...</p>;

  return (
    <div>
      <h1>Experiment Dashboard</h1>
      <p className="subtitle">
        Monitoring A/B test results for the “Book now” button in near real-time.
      </p>
      {error && <p className="error">{error}</p>}
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Views</th>
            <th>Clicks</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.variant}>
              <td>{m.variant}</td>
              <td>{m.views}</td>
              <td>{m.clicks}</td>
              <td>{(m.conversionRate * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;
