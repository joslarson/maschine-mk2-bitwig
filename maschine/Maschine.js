function Maschine() {

}

Maschine.prototype.ctrlsAreOn = function(ctrlArray) {
	var result = true;
	for (var i = 0; i < ctrlArray.length; i++) {
		var ctrlData2 = this.CTRLS[ctrlArray[i]].d2;
		if(ctrlData2 = 0 || ctrlData2 == undefined){
			result = false;
			break;
		}
	};
	return result;
};