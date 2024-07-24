import React, { useState, useEffect } from 'react';

const Hints = () => {
    const [activeSection, setActiveSection] = useState('hints');
    const [userInput, setUserInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showStrategies, setShowStrategies] = useState(false);
    const [strategyColors, setStrategyColors] = useState([]);

    const colors = ['#E6F3F0', '#FEF6EA', '#FEFCE8']; // 三种颜色

    const colorMap = {
        '#E6F3F0': '#007F66',
        '#FEF6EA': '#EE9E27',
        '#FEFCE8': '#FCE200'
    };

    const showSection = (section) => {
        setActiveSection(section);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updateStrategies();
        }
    };

    const updateStrategies = () => {
        setShowStrategies(false); // 隐藏旧的 strategies 部分
        setTimeout(() => {
            setStrategyColors(shuffleArray(colors)); // 打乱颜色顺序并设置为策略颜色
            setShowStrategies(true); // 显示新的 strategies 部分
        }, 0);
    };

    const shuffleArray = (array) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    return (
        <div className="hints">
            <div className="navbar">
                <button
                    className={activeSection === 'hints' ? 'active' : ''}
                    onClick={() => showSection('hints')}
                >
                    Hints
                </button>
            </div>

            <div className="content">
                <div className={`assignment-section ${activeSection === 'hints' ? 'active' : ''}`}>
                    <p>Need help? Ask your question here and the AI will help you:</p>
                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Please type your question"
                            className="input-bar"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <button onClick={updateStrategies} className={`request-hint-button ${isFocused ? 'focused' : ''}`}>&#x25BC;</button>
                    </div>
                    {showStrategies && (
                        <div className="strategies-content slide-in">
                            <h3>Strategies</h3>
                            <p>We identify that you are in [stage] stage. Here are three different ways that the AI can help you on [this stage]:</p>
                            {strategyColors.map((color, index) => (
                                <div className="strategy" style={{ backgroundColor: color }} key={index}>
                                    <div className="strategy-header">
                                        <h5 className='context-number' style={{ color: colorMap[color] }}>{index + 1}.</h5>
                                        <h4>Strategy {index + 1}</h4>
                                    </div>
                                    <p>Strategy description for strategy {index + 1}.</p>
                                    <ul>
                                        <li><strong>Pros:</strong> Pros of strategy {index + 1}</li>
                                        <li><strong>Cons:</strong> Cons of strategy {index + 1}</li>
                                    </ul>
                                    <p><strong>Preview:</strong> Preview of strategy {index + 1}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .hints {
                    border: 1px solid #696868;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    padding: 10px;
                    resize: both;
                    overflow: auto;
                    padding-top: 0px;
                    padding-left: 0px;
                    padding-right: 0px;
                }
                .navbar {
                    overflow: hidden;
                    background-color: transparent;
                    border-bottom: 1px solid #979BA1;
                }
                .navbar button {
                    position: relative;
                    float: left;
                    display: block;
                    text-align: center;
                    font-weight: lighter;
                    padding: 14px 16px;
                    text-decoration: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #000;
                }
                .navbar button.active,
                .navbar button:hover {
                    color: #4682B4;
                    text-decoration: underline;
                    text-decoration-color: #4682B4;
                    text-decoration-thickness: 5px;
                    text-underline-offset: 16px;
                }
                .content {
                    padding: 20px;
                }
                .input-container {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    margin: 10px 0;
                    border-radius: 8px;
                    flex-grow: 1;
                    transition: background-color 0.3s, color 0.3s;
                }
                .input-bar {
                    width: 80%;
                    background-color: transparent;
                    padding: 10px;
                    border: none;
                    outline: none;
                    flex-grow: 1;
                }
                .request-hint-button {
                    padding: 10px;
                    border: none;
                    background-color: transparent;
                    color: #757778;
                    cursor: pointer;
                    transform: rotate(-90deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s, color 0.3s;
                }
                .request-hint-button:hover {
                    color: black;
                }
                .input-container.focused {
                    border: 1px solid black;  
                }
                .request-hint-button.focused{
                    color: black;
                }
                .strategies-content {
                    margin-top: 20px;
                    animation: slide-in 0.5s ease-in;
                }
                .context-number{
                    font-size: 1.25rem;
                    font-weight: 400;
                    margin: 1em 0 .8em 0;

                }
                    h4 {
    font-weight: 400;
    font-size: 1.25rem;
    margin: 1em 0 .8em 0;
}
              .strategy {
                    margin-top: 10px;
                    padding: 12px;
                    border-radius: 8px;
                }
                .strategy-header {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    height: 32px; 
                    line-height: 1.2;
                }
                .strategy-header .context-number {
                    margin-right: 10px;
                }
                @keyframes slide-in {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hints;
