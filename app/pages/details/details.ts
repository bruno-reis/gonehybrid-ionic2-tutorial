import {GitHubService} from "../../services/github";
import {Page, NavController, NavParams} from "ionic-angular/index";

@Page({
  templateUrl: 'build/pages/details/details.html',
  providers: [GitHubService]
})

export class DetailsPage {
  public readme = ''
  public repo

  constructor(private github: GitHubService,
              private nav: NavController,
              private navParams: NavParams) {

    this.repo = navParams.get('repo')

    this.github.getDetails(this.repo).subscribe(
      data => this.readme = data.text(),
      err => {
        if (err.status = 400) {
          this.readme = 'This repo does not have a README.'
        } else {
          console.error(err)
        }
      },
      () => console.log('getDetails completed')
    )
  }
}