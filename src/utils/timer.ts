class Timer {
    private _isRunning = false;
    private startTime = 0;
    startTimer() {
        this._isRunning = true;
        this.startTime = Date.now();
        console.log("startTime", this.startTime);
    }
    stopTimer() {
        this._isRunning = false;
        const endTime = Date.now();
        const millisecondsPassed = endTime - this.startTime;
        console.log("millisecondsPassed", millisecondsPassed);
        return millisecondsPassed / 1000 / 60;
    }

    get isRunning() {
        return this._isRunning;
    }
}

export default Timer;
