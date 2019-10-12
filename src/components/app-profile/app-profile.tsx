import { Component, h, State } from '@stencil/core';
import { User, getUser } from '@/services/user';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  @State() user?: User;

  async componentDidLoad() {
    this.user = await getUser(1);
  }

  render() {
    if (this.user) {
      return (
        <h1>{this.user.name} {this.user.surname.toUpperCase()}</h1>
      );
    } else {
      return <div>Fetching user...</div>
    }
  }
}
