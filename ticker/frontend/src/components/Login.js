import React from 'react';
import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('UserStore')
@observer
class Login extends React.Component {
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.UserStore.login(values.username, values.password)
        .then(data => console.log(data));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row align="vertical">
        <Col span={12} offset={6}>
          <Card style={{width: '400px', margin: '0 auto', marginTop: '65px'}}>
            <p style={{color: 'red'}}>{this.props.UserStore.errors}</p>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
        </Col>
      </Row>
      );
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(Login);
export default WrappedLoginForm;