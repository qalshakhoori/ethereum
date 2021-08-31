import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import _campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributionForm extends Component {
  state = {
    value: '',
    errorMessage: null,
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = _campaign(this.props.campaignAddress);

    this.setState({ loading: true, errorMessage: null });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        type: '0x2',
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });

      this.setState({ loading: false, errorMessage: null });

      Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`);
    } catch (error) {
      this.setState({ loading: false, errorMessage: error.message });
      console.log(error);
    }
  };

  render() {
    return (
      <Form
        onSubmit={(e) => this.onSubmit(e)}
        error={!!this.state.errorMessage}
      >
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label='ether'
            labelPosition='right'
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Message error header='Oops!' content={this.state.errorMessage} />

        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributionForm;
