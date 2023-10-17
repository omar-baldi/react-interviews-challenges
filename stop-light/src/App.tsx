import './App.css';
import { lightsColors } from './constants/lightsColors';
import { useStopLight } from './hooks/useStopLight';

const commonStopLightStyle: React.CSSProperties = {
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  backgroundColor: 'grey',
};

function App() {
  const activeStopLightColor = useStopLight();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {lightsColors.map((color, index) => (
        <div
          key={`color-${color}-#${index}`}
          style={{
            ...commonStopLightStyle,
            ...(activeStopLightColor === color && {
              backgroundColor: color,
            }),
          }}
        />
      ))}
    </div>
  );
}

export default App;
