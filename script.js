// 正确答案数组
const correctAnswers = [
    "And I feel like that that's kind of been, you know, my story with seminary.",
    "I know I was gonna bring that up next.",
    "And why didn't it happen to you?",
    "And they don't know how to reconcile that with the God that they thought they knew.",
    "But to write down his character as I read, what did I see?"
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取提交按钮和重置按钮
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // 添加提交按钮事件监听器
    submitBtn.addEventListener('click', function() {
        calculateResult();
    });
    
    // 添加重置按钮事件监听器
    resetBtn.addEventListener('click', function() {
        resetTest();
    });
});

// 计算测试结果
function calculateResult() {
    // 获取用户输入
    const userInputs = [
        document.getElementById('audio1-input').value.trim(),
        document.getElementById('audio2-input').value.trim(),
        document.getElementById('audio3-input').value.trim(),
        document.getElementById('audio4-input').value.trim(),
        document.getElementById('audio5-input').value.trim()
    ];
    
    let totalWords = 0;
    let correctWords = 0;
    
    // 计算每个音频的正确率
    for (let i = 0; i < userInputs.length; i++) {
        const userAnswer = userInputs[i].toLowerCase();
        const correctAnswer = correctAnswers[i].toLowerCase();
        
        // 分割成单词数组
        const userWords = userAnswer.split(/\s+/).filter(word => word.length > 0);
        const correctWordsArray = correctAnswer.split(/\s+/).filter(word => word.length > 0);
        
        // 统计总单词数
        totalWords += correctWordsArray.length;
        
        // 计算正确单词数（取较短的数组长度进行比较）
        const minLength = Math.min(userWords.length, correctWordsArray.length);
        for (let j = 0; j < minLength; j++) {
            if (userWords[j] === correctWordsArray[j]) {
                correctWords++;
            }
        }
    }
    
    // 计算正确率
    const accuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;
    const roundedAccuracy = Math.round(accuracy * 100) / 100;
    
    // 显示结果
    displayResult(roundedAccuracy);
    
    // 显示正确答案
    displayCorrectAnswers();
}

// 显示测试结果
function displayResult(accuracy) {
    const resultDiv = document.getElementById('result');
    
    if (accuracy >= 80) {
        resultDiv.innerHTML = `恭喜！你通过了测试！正确率：${accuracy}%`;
        resultDiv.className = 'result pass';
    } else {
        resultDiv.innerHTML = `很遗憾，你没有通过测试。正确率：${accuracy}%，需要达到80%以上才能通过。`;
        resultDiv.className = 'result fail';
    }
}

// 显示正确答案
function displayCorrectAnswers() {
    const correctAnswersDiv = document.getElementById('correct-answers');
    
    let answersHTML = '<h3>正确答案</h3>';
    
    for (let i = 0; i < correctAnswers.length; i++) {
        answersHTML += `
            <div class="answer-item">
                <h4>音频 ${i + 1}：</h4>
                <p class="correct-text">${correctAnswers[i]}</p>
            </div>
        `;
    }
    
    correctAnswersDiv.innerHTML = answersHTML;
}

// 重置测试
function resetTest() {
    // 清空所有文本框
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`audio${i}-input`).value = '';
    }
    
    // 清空结果和正确答案
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = 'result';
    document.getElementById('correct-answers').innerHTML = '';
}