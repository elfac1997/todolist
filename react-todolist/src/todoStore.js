import axios from 'axios';
import { action, observable } from 'mobx';
import React, { Component, Fragment } from 'react';

class todoStore {
  @observable todo = [];
  @observable todo2 = [];
  @observable nextUrl = '';
  @observable preUrl = '';
  @observable nextUrl2 = '';
  @observable preUrl2 = '';
  

  @action getList(){

    axios.get('http://localhost:8000/tododetail/get_unfinished/')
        .then(response => {
            console.log(response)
            console.log(response.data.results);
            this.todo = response.data.results;
            console.log(this.todo);
            this.nextUrl = response.data.next;
            this.preUrl = response.data.previous;
        })

      axios.get('http://localhost:8000/tododetail/get_finished/')
      .then(response => {
          console.log(response)
          console.log(response.data.results);
          this.todo2 = response.data.results;
          console.log(this.todo2);
          this.nextUrl2 = response.data.next;
          this.preUrl2 = response.data.previous;
      })
   }

   @action handleItemDelete(id){
    const url = 'http://localhost:8000/tododetail/' +id
    return axios.delete(url,{id:id})
    .then(response=>{
      console.log(response)
    })
    .catch(error =>{
        console.log(error.message)
    });

   }

   @action createTodo(value) {
    const url = 'http://localhost:8000/tododetail/'
    return axios.post(url,{title: value})
    .then(response=>{
      console.log(response)
    })
    .catch(error =>{
          console.log(error.message)
    });
   }

   @action getNextPage() {
    if (!this.nextUrl) {
      return;
    }

     return axios.get(this.nextUrl).then((res) => {
       this.todo = res.data.results;
       this.nextUrl = res.data.next;
       this.preUrl = res.data.previous;
     })
   }

   @action getNextPage2() {
    if (!this.nextUrl2) {
      return;
    }

     return axios.get(this.nextUrl2).then((res) => {
       this.todo2 = res.data.results;
       this.nextUrl2 = res.data.next;
       this.preUrl2 = res.data.previous;
     })
   }

   @action getPrePage() {
    if (!this.preUrl) {
      return;
    }

    return axios.get(this.preUrl).then((res) => {
      this.todo = res.data.results;
      this.nextUrl = res.data.next;
      this.preUrl = res.data.previous;
    })
   }

   @action getPrePage2() {
    if (!this.preUrl2) {
      return;
    }

    return axios.get(this.preUrl2).then((res) => {
      this.todo2 = res.data.results;
      this.nextUrl2 = res.data.next;
      this.preUrl2 = res.data.previous;
    })
   }

   @action updateTodo(id,title,finished) {
      const url = 'http://localhost:8000/tododetail/'+id+'/'
      return axios.put(url,{title: title,finished:finished})
      .then(response=>{
        console.log(response)
      })
      .catch(error =>{
            console.log(error.message)
      });
   }

   @action updateFinished(id,title,finished) {
    const url = 'http://localhost:8000/tododetail/'+id+'/'
    finished = !finished
    return axios.put(url,{title:title,finished: finished})
    .then(response=>{
      console.log(response)
    })
    .catch(error =>{
          console.log(error.message)
    });
 }

 @action updateTitle(id,title,finished) {
  const url = 'http://localhost:8000/tododetail/'+id+'/'
  return axios.put(url,{title:title,finished: finished})
  .then(response=>{
    console.log(response)
  })
  .catch(error =>{
        console.log(error.message)
  });
}

}

export default new todoStore;