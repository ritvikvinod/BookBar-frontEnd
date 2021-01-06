import * as React from "react";

export default class PrivacyPolicyComponent extends React.Component {

    componentDidMount = async () => {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className="container carousel-style order-comp">
                <br/>
                <br/>
                <br/>
                <h1 className={'text-center'}><b>Bookbar Privacy Policy</b></h1>
                <br/>
                We understand that you care about how your information is collected and used and we
                truly appreciate your trust in us with your data. The Privacy Policy describes how
                our website collects and processes your personal information. <span
                className={'font-weight-bold'}> By using our website,
                you are consenting to the practices described below.</span>
                <br/><br/>
                <h3><b>Purpose of the website:</b></h3>
                <br/>
                Our website, referred to as BookBar hereon, is aimed at providing an alternative
                solution overcoming the shortcomings of the physical bookstores. The website acts as
                a convenient
                platform to connect both buyers and sellers obviating the hassles involved with
                the physical stores. A seller can post all the required details of a book like
                price, different forms of availability, available quantity, etc. A buyer can
                browse the website, find the details of the books they are interested in and
                place an order to be delivered to his place. All this happens without the need
                to leave the comfort of your seat. The website connects sellers and buyers from across the
                globe and payments can be made online.
                <br/>
                <br/>
                <h3><b>What information does our website collect from you?</b></h3>
                <br/>
                We collect your personal information in order to provide and continually improve
                our services.
                <br/>
                <ul>
                    <br/>
                    <li><h5><b>Information we absolutely need from you: </b></h5><p>We need your address
                        to deliver your orders to your place. We need your credit/debit card details
                        to charge you for your orders and pay the sellers accordingly. We need your
                        email ID and phone number to send you the order receipts and for password
                        recovery and authentication through OTPs.</p></li>
                    <li><h5><b>Information that would help us improve our website so we can serve
                        you better:</b></h5><p>The search history would help us get more insights into
                        the kind of books that the users are looking for and hence help us plan our
                        bookstore collection accordingly. We collect information about the
                        most visited pages while you are on our website so that we improve those
                        pages to enhance the user experience. We would need information on the order
                        timestamps in order to find out the peak order times so that we can scale
                        our application accordingly with preparedness.</p></li>
                    <li><h5><b>Information that would help to monetize our website:</b></h5><p>We
                        collect demographic information of our users to display relevant
                        internet-based ads that might be of interest to you. We also need
                        geographical information to serve you with specific ads that might interest
                        you. </p></li>
                    <li><h5><b>Integration with third party services:</b></h5><p>We integrate with
                        third-party ad services like Google ads and our site may have affiliate
                        links and embedded social sharing links in order to monetize on the website.
                        We provide these third-party ad services with information that allows them
                        to
                        serve you with more useful and relevant ads and to measure their
                        effectiveness. When we do this, we never share you name or other information
                        that directly identifies you. Also, the embedded links may collect
                        information about you when you click on them and go to their websites. We
                        recommend you going through their privacy policy for further information
                        about how they might use your data. </p></li>
                </ul>
            <br/>
            </div>
        )
    }
}
