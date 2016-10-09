
class AddController {
  constructor() {
    'ngInject';
    this.caption = "";

    this.change = (num) => {
    	return num;
    };

    this.time = this.change("30 mins");

    this.updateTime = (time) => {
    	if(time > 3600) {
    		
    		this.time = Math.round(time/3600) + " hrs";
    	}
    	else {
    	this.time = Math.round(time / 60) + " mins";
    	}
    };

  }
}

export default AddController;