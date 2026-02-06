export class Global {
  static ipAddress = "raw.githubusercontent.com";
  static user = "dpraful";
  static repo = "my-portfolio";
  static Url = `${this.user}/Assets/main/${this.repo}/`;
}

export const APIURL = `https://${Global.ipAddress}/${Global.Url}`;
