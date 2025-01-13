import React, { useState } from 'react';

const GradientPicker: React.FC = () => {
    const [color1, setColor1] = useState<string>('#ff0000');
    const [color2, setColor2] = useState<string>('#0000ff');

    const updateGradient = () => {
        return `linear-gradient(to right, ${color1}, ${color2})`
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <input 
                type="color" 
                value={color1} 
                onChange={(e) => setColor1(e.target.value)} 
            />
            <input 
                type="color" 
                value={color2} 
                onChange={(e) => setColor2(e.target.value)} 
            />
            <div 
                style={{ 
                    width: '300px', 
                    height: '100px', 
                    marginTop: '10px', 
                    border: '1px solid #ccc', 
                    borderRadius: '5px', 
                    background: updateGradient() 
                }} 
            />
        </div>
    );
};

export default GradientPicker;
