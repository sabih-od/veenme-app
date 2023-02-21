import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EventsService } from './basic/events.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public utility: UtilityService,
    public api: ApiService,
    public router: Router,
    private events: EventsService
  ) {
    // console.log('Hello NetworkProvider Provider');
  }

  login(data) {
    return this.httpPostResponse('auth', data, null, false);
  }

  register(data) {
    return this.httpPostResponse('signup', data, null, false);
  }

  sociallogin(data) {
    return this.httpPostResponse('social-login', data, null, false);
  }

  getRestaurants() {
    return this.httpGetResponse('explore/?type=1', null, false);
  }

  getLandmarks() {
    return this.httpGetResponse('explore/?type=2', null, false);
  }

  getHistorical() {
    return this.httpGetResponse('explore/?type=3', null, false);
  }

  getNature() {
    return this.httpGetResponse('explore/?type=4', null, false);
  }

  profile() {
    return this.httpGetResponse('profile', null, false);
  }

  getUserByUsername(userName) {
    return this.httpGetResponse(
      `user/get-user-by-username?username=${userName}`,
      null,
      false
    );
  }

  getVeens() {
    return this.httpGetResponse('profile/get-veens', null, false);
  }

  getVeensByPlaceId(place_id) {
    return this.httpGetResponse(
      `profile/get-veens?place=${place_id}`,
      null,
      false
    );
  }

  getPublicPosts(page = 1) {
    return this.httpGetResponse('post/public-posts?page=' + page);
  }

  getPublicPostsByPlaceId(placeId) {
    return this.httpGetResponse('place/posts?place_id=' + placeId);
  }

  getPosts() {
    return this.httpGetResponse('post');
  }

  getReiews(page = 1) {
    return this.httpGetResponse('review?page=' + page);
  }

  getGallery(page = 1) {
    return this.httpGetResponse('gallery?page=' + page);
  }

  getUserGallery(id) {
    return this.httpGetResponse('gallery?user_id=' + id);
  }

  getFollowingList(id) {
    return this.httpGetResponse('follow/following-list?user_id=' + id);
  }

  getFollowerList(id) {
    return this.httpGetResponse('follow/follower-list?user_id=' + id);
  }

  followUser(user_id) {
    return this.httpGetResponse(
      'follow/follow?user_id=' + user_id,
      null,
      false
    );
  }

  unFollowUser(user_id) {
    return this.httpGetResponse(
      'follow/unfollow?user_id=' + user_id,
      null,
      false
    );
  }

  getPlaces(page = 1) {
    return this.httpGetResponse('place/place-posts?page=' + page);
  }

  getPlacesById(id) {
    return this.httpGetResponse('place?place_id=' + id);
  }

  getPostComments(postId) {
    return this.httpGetResponse('comment/get-comment?post_id=' + postId);
  }

  likeUnlikePost(postId) {
    return this.httpGetResponse('like/like?post_id=' + postId);
  }

  likeUnlikePostComment(postId, commentId) {
    return this.httpGetResponse(
      `like/like?post_id=${postId}&comment_id=${commentId}`
    );
  }

  getMightFollowList(page, search) {
    return this.httpGetResponse(
      `follow/might-follow-list?q=${search}&page=` + page,
      null,
      false
    );
  }

  getPeopleVeening() {
    return this.httpGetResponse('place/people-are-veeing', null, false);
  }

  getActivities() {
    return this.httpGetResponse('activity', null, false);
  }

  getNotifications() {
    return this.httpGetResponse('notification', null, false);
  }

  getLatestNotification() {
    return this.httpGetResponse('notification/latest-notification', null, false);
  }

  createComment(data) {
    return this.httpPostResponse('comment/create', data);
  }

  createPost(data) {
    return this.httpPostResponse('post/create', data, null, true);
  }

  updateUserInfo(data) {
    return this.httpPostResponse('profile/update-user-info', data, null, false);
  }

  uploadImage(data) {
    return this.httpPostResponse(
      'file/upload',
      data,
      null,
      false,
      true,
      'application/json; charset=UTF-8'
    );
  }

  uploadProfilePic(data) {
    return this.httpPostResponse(
      'profile/upload-profile-picture',
      data,
      null,
      false,
      true,
      'application/json; charset=UTF-8'
    );
  }

  getNearbyVeens({ latitude, longitude }) {
    return this.httpGetResponse(
      `profile/near-by-veens?latitude=${latitude}&longitude=${longitude}`
    );
  }

  changePassword(data) {
    return this.httpPostResponse('user/change-password', data);
  }

  postReview(data) {
    return this.httpPostResponse('place/post-review', data);
  }

  getVeenById(id) {
    return this.httpGetResponse(`profile/get-veen-by-id?id=${id}`);
  }

  getUserVeens(userId) {
    return this.httpPostResponse(`profile/get-veens?user=${userId}`, null);
  }

  getPost(id) {
    return this.httpGetResponse(`post/get-post?id=${id}`, null);
  }

  getMessages(id) {
    return this.httpGetResponse(`message/?receiver_id=${id}`, null);
  }

  sendMessage(data) {
    return this.httpPostResponse(`message/create`, data);
  }

  serialize = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  };

  httpPostResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpGetResponse(
    key,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpPutResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return new Promise((resolve, reject) => {
      id = id ? `/${id}` : '';
      const url = key + id;

      this.api.put(key, data).subscribe((res: any) => {
        if (res.bool !== true) {
          if (showError) {
            this.utility.presentSuccessToast(res.message);
          }
          reject(null);
        } else {
          resolve(res);
        }
      });
    });
  }

  httpPatchResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return new Promise((resolve, reject) => {
      id = id ? `/${id}` : '';
      const url = key + id;

      this.api.patch(key, data).subscribe((res: any) => {
        if (res.bool !== true) {
          if (showError) {
            this.utility.presentSuccessToast(res.message);
          }
          reject(null);
        } else {
          resolve(res);
        }
      });
    });
  }

  httpDeleteResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return new Promise((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        console.log(res);
        if (res.bool !== true) {
          if (showError) {
            this.utility.presentSuccessToast(res.message);
          }
          reject(null);
        } else {
          resolve(res);
        }
      });
    });
  }

  // default 'Content-Type': 'application/json',
  httpResponse(
    type = 'get',
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }

      id = id ? '/' + id : '';
      const url = key + id;
      let headers = new HttpHeaders();
      headers.append('Content-Type', contenttype);
      console.log(url);
      const seq =
        type === 'get'
          ? this.api.get(url, {})
          : this.api.post(url, data, { headers: headers });

      seq.subscribe(
        (res: any) => {
          console.log('Network call result');

          if (showloader === true) {
            this.utility.hideLoader();
          }

          if (res.success !== true) {
            if (showError) {
              this.utility.presentSuccessToast(res.message);
            }
            reject(null);
          } else {
            resolve(res);
          }
        },
        (err) => {
          const error = err.error;
          if (showloader === true) {
            this.utility.hideLoader();
          }

          if (showError) {
            this.utility.presentFailureToast(error.message);
          }

          console.log(err);

          // if(err.status === 401){
          //   this.router.navigate(['splash']);
          // }

          reject(null);
        }
      );
    });
  }

  showFailure(err) {
    // console.error('ERROR', err);
    err = err ? err.message : 'check logs';
    this.utility.presentFailureToast(err);
  }
}
