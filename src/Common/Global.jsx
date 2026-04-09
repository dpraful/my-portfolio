export class Global {
  static ipAddress = "raw.githubusercontent.com";
  static user = "dpraful";
  static repo = "my-portfolio-backend";
  static Url = `${this.user}/${this.repo}/main/`;
}

export const APIURL = `https://${Global.ipAddress}/${Global.Url}`;
