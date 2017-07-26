formatTime () {
	this.ratings.forEach((rating) => {
		let timeString = rating.rateTime;
		let timeStamp = new Date(timeString);
		let year = '2' + timeStamp.getYear() - 100;
		let month = timeStamp.getMonth();
		let day = timeStamp.getDate();
		let hours = timeStamp.getHours();
		let min = timeStamp.getMinutes();
		let sec = timeStamp.getSeconds();
		let ts = `${year}-${month}-${day} ${hours}:${min}:${sec}`;
		this.formatedTime.push(ts);
	});
}