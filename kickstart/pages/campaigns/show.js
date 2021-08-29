import React, { Component } from 'react';
import Layout from '../../components/Layout';
import _campaign from '../../ethereum/campaign';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = _campaign(props.query.address); // campaign address

    const summery = await campaign.methods.getSummery().call();

    return {
      minimumContribution: summery[0],
      balance: summery[1],
      requestsCount: summery[2],
      approversCount: summery[3],
      manager: summery[4],
    };
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    );
  }
}

export default CampaignShow;
