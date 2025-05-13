import React from 'react';
import { Controller } from 'react-hook-form';

export function MeasurementsForm({ control }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Height (cm)</label>
        <Controller
          name="height"
          control={control}
          rules={{ min: 100, max: 250 }}
          render={({ field }) => <input {...field} type="number" className="w-full p-2 border rounded" />}
        />
      </div>
      <div>
        <label className="block mb-1">Weight (kg)</label>
        <Controller
          name="weight"
          control={control}
          rules={{ min: 30, max: 200 }}
          render={({ field }) => <input {...field} type="number" className="w-full p-2 border rounded" />}
        />
      </div>
      <div>
        <label className="block mb-1">Body Type</label>
        <Controller
          name="build"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded">
              {['lean', 'regular', 'athletic', 'big'].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        />
      </div>
    </div>
  );
}
