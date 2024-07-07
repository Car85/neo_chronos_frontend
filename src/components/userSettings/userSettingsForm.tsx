import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); 

interface UserSettingsFormProps {
  baselineSetpoint: number;
  thaSetpoint: number;
  effectiveSetpoint: number;
  tolerance: number;
  minSetpoint: number;
  maxSetpoint: number;
  offsetSummer: number;
  offsetWinter: number;
  deltaTemp: number;
  lockoutTime: number;
  cascadeTime: number;
  onUpdate: (updatedSettings: any) => void;
}

const UserSettingsForm: preact.FunctionalComponent<UserSettingsFormProps> = (props) => {
  const [formData, setFormData] = useState({
    tolerance: props.tolerance,
    minSetpoint: props.minSetpoint,
    maxSetpoint: props.maxSetpoint,
    offsetSummer: props.offsetSummer,
    offsetWinter: props.offsetWinter,
    deltaTemp: props.deltaTemp,
    lockoutTime: props.lockoutTime,
    cascadeTime: props.cascadeTime,
  });

  useEffect(() => {
    setFormData({
      tolerance: props.tolerance,
      minSetpoint: props.minSetpoint,
      maxSetpoint: props.maxSetpoint,
      offsetSummer: props.offsetSummer,
      offsetWinter: props.offsetWinter,
      deltaTemp: props.deltaTemp,
      lockoutTime: props.lockoutTime,
      cascadeTime: props.cascadeTime,
    });
  }, [props]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onUpdate(formData);
    socket.emit("add_settings", formData); 
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
          <input type="number" name="minSetpoint" value={formData.minSetpoint} onChange={handleChange} />
        </div>
        <div>
          <label>Max. Setpoint:</label>
          <input type="number" name="maxSetpoint" value={formData.maxSetpoint} onChange={handleChange} />
        </div>
        <div>
          <label>Setpoint Offset Summer:</label>
          <input type="number" name="offsetSummer" value={formData.offsetSummer} onChange={handleChange} />
        </div>
        <div>
          <label>Setpoint Offset Winter:</label>
          <input type="number" name="offsetWinter" value={formData.offsetWinter} onChange={handleChange} />
        </div>
        <div>
          <label>Mode Change Delta Temp:</label>
          <input type="number" name="deltaTemp" value={formData.deltaTemp} onChange={handleChange} />
        </div>
        <div>
          <label>Mode Switch Lockout Time:</label>
          <input type="number" name="lockoutTime" value={formData.lockoutTime} onChange={handleChange} />
        </div>
        <div>
          <label>Cascade Time:</label>
          <input type="number" name="cascadeTime" value={formData.cascadeTime} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsForm;
