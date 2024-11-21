import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getAxiosClient from "../axios-instance";
// import axios from "axios"; //Uncomment here and on line 9 if you want to see the middleware send an error response of unauthorized

export default function Todos(){
  const modalRef = useRef();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm({ 
    defaultValues: { 
      name: "", 
      description: "" 
    } 
  });

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();

      const { data } = await axiosInstance.get("http://localhost:8080/todos");
      // const { data } = await axios.get("http://localhost:8080/todos")

      return data;
    }
  });

  const { mutate: createNewTodo } = useMutation({
    mutationKey: ["newTodo"],
    mutationFn: async (newTodo) => {
     const axiosInstance = await getAxiosClient(); 

      const { data } = await axiosInstance.post("http://localhost:8080/todos", newTodo);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const { mutate: markAsCompleted } = useMutation({
    mutationKey: ["markAsCompleted"],
    mutationFn: async (todoId) => {
     const axiosInstance = await getAxiosClient(); 

      const { data } = await axiosInstance.put(`http://localhost:8080/todos/${todoId}/completed`);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  if(isLoading){
    return (
      <div className="">Loading Todos...</div>
    )
  }
  
  if(isError){
    return (
      <div className="">There was an error</div>
    )
  }

  console.log(data);

  const toggleNewTodoModal = () => {
    if(modalRef.current.open){
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
    }
  }

  const handleNewTodo = (values) => {
    createNewTodo(values)
    toggleNewTodoModal();
  }

  return (
    <>
      <button className="btn btn-primary" onClick={() => toggleNewTodoModal()}>
        New Todo
      </button>
      <div>{data.success && data.todos.length >= 1 && (
        <ul>
          {
            data.todos.map(todo => (
              <li className="inline-flex items-center">
                <div>
                  <h3>
                    {todo.name}
                  </h3>
                  <p>{todo.description}</p>
                </div>
                <div>
                  <label className="swap">
                    <input type="checkbox" onClick={() => markAsCompleted(todo.id)} />
                    <div className="swap-on">
                      Yes
                    </div>
                    <div className="swap-off">
                      No
                    </div>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      )}</div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Todo</h3>
          <form onSubmit={handleSubmit(handleNewTodo)}>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Name of Todo</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full" {...register("name")} />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Description</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full" {...register("description")} />
          </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Create Todo</button>
              <button type="button" onClick={() => toggleNewTodoModal()} className="btn btn-ghost">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
    
  )
}
