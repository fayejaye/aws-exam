import React, { useState, useEffect } from 'react';
import Card from './Card'
import { IconButton } from '@material-ui/core';
import RightIcon from '@material-ui/icons/ChevronRightOutlined';
import LeftIcon from '@material-ui/icons/ChevronLeftOutlined';

interface MyObject {
  service: string,
  question: string,
  answer: string
}

const Home = () => {
  const [data, setData] = useState<MyObject[]>()
  const [activeIndex, setActiveIndex] = useState(0)

  let api_response = [
    { service: 'Kinesis', question: 'What drives the number of consumers you should have?', answer: 'CPU Utilization' },
    { service: 'Lambda', question: 'Whats the default account limit for concurrent executions per second?', answer: '1,000' },
    { service: 'X-Ray', question: 'When setting up X-Ray in an ECS, does X-Ray Daemon need its own Docker image?', answer: 'Yes' },
    { service: 'Lambda', question: 'What 2 VPC configurations does Lambda need to connect to the VPC?', answer: 'Private Subnet ID and Security Group ID. If a Lambda function needs to connect to a VPC and needs Internet access, make sure you connect to a private subnet that has a route to a NAT Gateway (the NAT Gateway will be in a public subnet)' },
    { service: 'API Gateway', question: 'How many requests per second can API Gateway handle and if it exceeds this what error code will be thrown?', answer: '10,000 and 429 status code' },
    { service: 'API Gateway', question: 'How many concurrent requests per second can API Gateway?', answer: '5,000' },
    { service: 'CloudFront', question: 'Whats the default time to live before objects are cleared from the edge location cache?', answer: '24 hours' },
    { service: 'Lambda', question: 'Whats a Dead Letter Queue?', answer: 'If a Lambda is invoked asyncronously, it will be retried twice before failing. To understand why, DLQ can direct unprocessed events to an SNS queue or SNS topic to debug.' },
    { service: 'CLI', question: 'What can you change if you are getting timeout errors when using the CLI?', answer: 'Adjust the pagination of the CLI Results (too many results are being returned)' },
    { service: 'Dynamo DB', question: 'Whats is a strongly consistent read?', answer: 'Strongly consistent read uses the latest data when reading a Dynamo DB table, this is also the most expensive' },
    { service: 'Dynamo DB', question: 'Whats is a eventually consistent read?', answer: 'Eventually consistent read is the default (unless specified) but might not reflect the results of a recently completed write operation, the response might include some stale data ' },
    { service: 'Lambda', question: 'Whats is a Lambda Alias?', answer: 'Points to a specific Lambda version' },
    { service: 'Lambda', question: 'Does each Lambda version have its own ARN?', answer: 'True' },
    { service: 'Elastic Bean Stalk', question: 'When deploying an application, what folder should your config files be in?', answer: '.ebextensions' },
    { service: 'SQS', question: 'Can you change the SQS queue type after its been created?', answer: 'No, you must chose the queue type when you create it' },
    { service: 'EC2', question: 'Name the 4 EC2 Pricing options?', answer: 'On demand, Reserved, Spot, Dedicated Host' },
    { service: 'ElastiCache', question: 'What is Lazy Loading?', answer: 'Only requested data is cached' },
    { service: 'ElastiCache', question: 'What is Write Off?', answer: 'Only cache when data is written to the database' },
    { service: 'ElastiCache', question: 'What is Write Penalty?', answer: 'Writing to the cache and to the database' },
    { service: 'Kinesis', question: 'What is the Kinesis shard capacity?', answer: '5 read, 1000 write transactions' },
    { service: 'KMS', question: 'Are KMS keys regional?', answer: 'True' },
    { service: 'RDS', question: 'What is an RDS Read Replica?', answer: 'For read heavy applications (i.e. blogs), the EC2 reads from the Read Replica rather than the RDS to improve performance.' },
    { service: 'RDS', question: 'What is a Multi AZ?', answer: 'Provides high availability and failover support for DB instances. In Multi-AZ deployment, AWS RDS automatically provisions and maintains a synchronous standby replica in a different Availability zone.' },
    { service: 'SQS', question: 'Explain the difference between short & long polling?', answer: 'Short polling returns immediately even if no messages in the queue. Long polling is the periodic retrieval of messages and the cheapest option.' },
    { service: 'SQS', question: 'How long are messages in the SQS queue for?', answer: '1 minute to 14 days' },
    { service: 'SQS', question: 'What is the default and max visibility?', answer: '30 seconds to 12 hours' },
    { service: 'SQS', question: 'How long can you delay the delivery of new messages to a queue?', answer: 'Up to 15 mins (900 seconds)' },
    { service: 'S3', question: 'What is the maximum file size in S3 and the max PUT operation size?', answer: '0-5KB file size and PUT max of 5GB' },
    { service: 'EC2', question: 'Can an EC2 be encrypted once up and running?', answer: 'No, the EBS volume must also be encrypted on creation.' },
    { service: 'CodeDeploy', question: 'What is the purpose of the AppSpec file?', answer: 'Define parameters to be used by CodeDeploy' },
    { service: 'CodeDeploy', question: 'Name the 7 lifehooks in CodeDeploy?', answer: 'App stop, Download bundle, Before Install, Install, After Install, Application Start, Validate Service' },
    { service: 'CloudTrail', question: 'What is CloudTrail?', answer: 'Monitors yur API calls in the AWS platform for auditing purposes' },
    { service: 'Dynamo DB', question: 'What is DAX (Accelerator)?', answer: 'In memory cache to improve performance' },
    { service: 'Dynamo DB', question: 'What is the Local Secondary Index?', answer: 'Created when you create a table. Same partition key but different sort key.' },
    { service: 'Dynamo DB', question: 'What is the Global Secondary Index?', answer: 'Chose a different Partition Key and Sort Key as your main table.' },
    { service: 'CloudFormation', question: 'You need to preconfigure an EC2 instance with the NGINX web server to host the application, what script could you use in CloudFormation to accomplish this??', answer: 'cfn-lint helper script can be used to install and configure software applications on EC2 instances' },
    { service: 'DynamoDB', question: 'Do Global Secondary Index support Consistent or Eventual reads?', answer: 'Only eventual read' },
    { service: 'Lambda', question: 'What is the default timeout and memory?', answer: 'Timeout is 3 seconds, Memory is 128GB' },
    { service: 'KMS', question: 'An application needs to encrypt data using the KMS service, what 2 steps need to be follwed in the encryption process?', answer: 'Use the GenerateDataKeyWithoutPlainText to get the data key to encrypt the data + Delete the plaintext data encryption key after the data is encrypted.' },
    { service: 'Dynamo DB', question: 'When would you use a Projection Expression in Dynamo DB?', answer: 'To specify a certain attribute from a table instead of all the items during a scan or query.' },
    { service: 'Dynamo DB', question: 'If you are doing a strongly consistent read request from an application to Dynamo DB with a DAX Cluster, will the results be cached?', answer: 'No' },
    { service: 'Dynamo DB', question: 'Whats is Write Through cache in relation to DAX?', answer: 'Allows you to issue writes directly, so that your writes are immediately reflected in the item cache.' },
    { service: 'S3', question: 'Youve noticed s3 file uploads are taking a long time with the size around 200-400MB, how can you improve this?', answer: 'Use Multipart upload API' },
    { service: 'Dynamo DB', question: '50 writes at 1.5KB per item, how many WCUs?', answer: '50 x 2KB = 100WCU (Always round up to nearly 1KB)' },
    { service: 'Dynamo DB', question: '10 strong reads at 6KB per item, how many RCUs?', answer: '10 x (8KB/5KB) = 20 (Round size to nearest 4KB)' },
    { service: 'Dynamo DB', question: '10 eventual reads at 6KB per item, how many RCUs?', answer: '10 x (8KB/5KB) = 20/2 = 10 (Round size to nearest 4KB)' },
    { service: 'X-Ray', question: 'What is the default sampling rule?', answer: 'X-Ray records 1 request per second & 5% of any additional requests per host' },
    { service: 'RDS', question: 'Why might you look at the slow query logs in the RDS service?', answer: 'Diagnose performance issues in SQL statements that took longer to execute than the set amount of time' },
  ]

  useEffect(() => {
    const fetch = async () => {
      const result = api_response
      setData(result);
    };
    fetch();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            {activeIndex !== 0 && <IconButton color='primary' onClick={() => setActiveIndex(activeIndex - 1)}><LeftIcon /></IconButton>}
      {data && <Card length={data.length} activeIndex={activeIndex + 1} service={data[activeIndex].service} question={data[activeIndex].question} answer={data[activeIndex].answer} />}
      {activeIndex + 1 !== 0 && <IconButton color='primary' onClick={() => setActiveIndex(activeIndex + 1)}><RightIcon /></IconButton>}

    </div>
  )
}

export default Home
