import { Component } from '@angular/core';
import { NavController, NavParams ,Events,AlertController} from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  id: string;
  password:any;
  loginError:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private helper:HelperProvider,private events:Events,public alertCtrl: AlertController) {
    this.events.subscribe('login:error', () => {
      console.log('Heard Login Error');
      this.loginError = this.helper.getLoginError();
      console.log('Login Error',this.loginError);
      this.showAlert(this.loginError.message);
    });

  }

  showAlert(msg) {
    let message;
    if(msg.includes('Http failure response for')) {
      message = 'Great Scott! The 1.21 Gigawatts flux capacitor just exploded on the server. Try again after sometime.'
    } else {
      message = msg;
    }
    const alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }
  signMeIn(){
    console.log("Id:",this.id);
    console.log("password:",this.password);
    this.helper.callAuthService(this.id,this.password);
  }

}
