import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

interface UserSettingsFormProps {
  baselineSetpoint: number;
  thaSetpoint: number;
  effectiveSetpoint: number;
  tolerance: number;
  setpoint_min: number;
  setpoint_max: number;
  setpoint_offset_summer: number;
  setpoint_offset_winter: number;
  mode_change_delta_temp: number;
  mode_switch_lockout_time: number;
  cascade_time: number;
  onUpdate: (updatedSettings: any) => void;
}

const UserSettingsForm: preact.FunctionalComponent<UserSettingsFormProps> = (props) => {
  const [formData, setFormData] = useState({
    tolerance: props.tolerance,
    setpoint_min: props.setpoint_min,
    setpoint_max: props.setpoint_max,
    setpoint_offset_summer: props.setpoint_offset_summer,
    setpoint_offset_winter: props.setpoint_offset_winter,
    mode_change_delta_temp: props.mode_change_delta_temp,
    mode_switch_lockout_time: props.mode_switch_lockout_time,
    cascade_time: props.cascade_time,
  });

  useEffect(() => {
    setFormData({
      tolerance: props.tolerance,
      setpoint_min: props.setpoint_min,
      setpoint_max: props.setpoint_max,
      setpoint_offset_summer: props.setpoint_offset_summer,
      setpoint_offset_winter: props.setpoint_offset_winter,
      mode_change_delta_temp: props.mode_change_delta_temp,
      mode_switch_lockout_time: props.mode_switch_lockout_time,
      cascade_time: props.cascade_time,
    });
  }, [props]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    props.onUpdate(formData);

    // Log the formData to check the emitted data
    console.log('Submitting form with data:', formData);

    // Perform a POST request to localhost:8000/add_settings
    try {
        const response = await fetch('http://localhost:5000/add_settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Server response:', data);
    } catch (error) {
        console.error('Error while posting data:', error);
    }
  };

  return (
    <div className="user-settings-form">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Baseline Setpoint:</label>
          <span>{props.baselineSetpoint}</span>
        </div>
        <div>
          <label>THA Setpoint:</label>
          <span>{props.thaSetpoint}</span>
        </div>
        <div>
          <label>Effective Setpoint:</label>
          <span>{props.effectiveSetpoint}</span>
        </div>
        <div>
          <label>Tolerance:</label>
          <input type="number" name="tolerance" value={formData.tolerance} onChange={handleChange} />
        </div>
        <div>
          <label>Min. Setpoint:</label>
          <input type="number" name="setpoint_min" value={formData.setpoint_min} onChange={handleChange} />
        </div>
        <div>
          <label>Max. Setpoint:</label>
          <input type="number" name="setpoint_max" value={formData.setpoint_max} onChange={handleChange} />
        </div>
        <div>
          <label>Setpoint Offset Summer:</label>
          <input type="number" name="setpoint_offset_summer" value={formData.setpoint_offset_summer} onChange={handleChange} />
        </div>
        <div>
          <label>Setpoint Offset Winter:</label>
          <input type="number" name="setpoint_offset_winter" value={formData.setpoint_offset_winter} onChange={handleChange} />
        </div>
        <div>
          <label>Mode Change Delta Temp:</label>
          <input type="number" name="mode_change_delta_temp" value={formData.mode_change_delta_temp} onChange={handleChange} />
        </div>
        <div>
          <label>Mode Switch Lockout Time:</label>
          <input type="number" name="mode_switch_lockout_time" value={formData.mode_switch_lockout_time} onChange={handleChange} />
        </div>
        <div>
          <label>Cascade Time:</label>
          <input type="number" name="cascade_time" value={formData.cascade_time} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsForm;
