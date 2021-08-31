import React, { Component } from 'react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';

class RequestIndex extends Component {
  static getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Requests</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
