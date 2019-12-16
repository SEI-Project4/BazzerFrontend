import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import './HomePage.css'
import { Button, Divider, Input, Segment, Card, Icon, Image } from 'semantic-ui-react'
import { Container } from 'react-bootstrap'
import Footer from '../Footer/Footer'

export default class HomePage extends Component {
    state={
        token:"",
    }

    componentDidMount(){
        if (localStorage.usertoken==true) {
            console.log('user token');
            
                  var decoded = jwt.verify(localStorage.usertoken, 'secret')
                  console.log(decoded.user);
                  this.setState({ token: decoded })
                } else { }
    }
    render() {
        
        return (
            <div>
                <Container>
                <br/>
                    <Segment basic textAlign='center'>
                        <Input
                            action={{ color: 'blue', content: 'Search' }}
                            icon='search'
                            iconPosition='left'
                            placeholder='Search for something'
                        />

                        <Divider horizontal>Or</Divider>

                        <Button
                            color='teal'
                            content='Sell Anything'
                            icon='add'
                            labelPosition='left'
                            href="/create"
                        />
                    </Segment>
                </Container>
                <br/><br/>
                <div className="ui four column doubling stackable grid center aligned container">
                <div class="column">
               
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        
                        <img style={{maxHeight:'250px'}} src="https://a.imge.to/2019/12/14/vfFIKx.png"/>
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
                
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <img style={{height:'250px'}} src='https://i.imgur.com/8Uirvpc.jpg' />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
               
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
                
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://a.imge.to/2019/12/14/vfFIKx.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
               
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
                
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
               
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
                
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
               
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    <div class="column">
                
                    <Card style={{margin:'0 auto'}}  class="ui segment">
                        <Image src='https://i.imgur.com/8Uirvpc.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>MacBook</Card.Header>
                            
                            <Card.Description>
                                This is a 2018 model item, light usag..
</Card.Description>
<Card.Meta style={{fontWeight:'bold', marginTop:'20px', textAlign:'center'}}>
                                <span>Current bid 400$</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Ali hdd
      </a>
                        </Card.Content>
                    </Card>
                    
                    </div>
                    
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
