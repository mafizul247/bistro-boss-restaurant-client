import React from 'react';

const Stats = ({ stats }) => {
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title font-bold">Revenue</div>
                <div className="stat-value text-primary">${stats?.revenue}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title font-bold">Customers</div>
                <div className="stat-value text-secondary">{stats?.customers}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-warning">
                </div>
                <div className="stat-title font-bold">Products</div>
                <div className="stat-value text-warning">{stats?.products}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title font-bold">Orders</div>
                <div className="stat-value">{stats?.orders}</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
        </div>
    );
};

export default Stats;