import React, { Component } from 'react';
import './App.css';
import {getAllStudents} from './client';

import { Table, Avatar, Spin, Modal} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Container from './container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';


const getIndicatorIcon = () => <LoadingOutlined  style={{ fontSize: 24 }} spin />;
class App extends Component {
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  }

  componentDidMount(){
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})

  closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})

  fetchStudents = () => {
    this.setState({
      isFetching: true
    });
    getAllStudents()
    .then(res => res.json()
    .then(students => {
      this.setState({
        students,
        isFetching: false
      });
    }));
  }
  
  render(){
    
    const {students, isFetching, isAddStudentModalVisible} = this.state;
    if(isFetching){
      return(
      <Container>
         <Spin size ='large' indicator={getIndicatorIcon()} />
      </Container>
      )
    }

    if(students && students.length){
      const columns = [
        {
          title: '',
          dataIndex: 'avatar',
          render: (text, student) => (
            <Avatar size = 'large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'StudentId',
          dataIndex: 'studentId',
          key: 'studentId',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        }
      ];
      return (
        <Container>
      <Table 
      dataSource={students} columns={columns} pagination = {false} rowKey ='studentId'
      />
      <Modal
          title = 'Add new Student'
          visible = {isAddStudentModalVisible}
          onOk = {this.closeAddStudentModal}
          onCancel = {this.closeAddStudentModal}
          width = {1000} >
            <AddStudentForm/>
      </Modal>
      <Footer handleAddStudentClickEvent = {this.openAddStudentModal} numberOfStudents = {students.length}/>
      </Container>
      );
    }
    return (
      <h1>No Students Found</h1>
        );
  }
 
}

export default App;
