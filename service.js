/**
 * There are many options for communication between twp services in micro services desgin. Below are list of communication methods that can be used.
 * 1. API calls
 * 2. gRPC
 * 3. Events
 * 4. Kubernets service calls
 *
 * I personally like the Kubernets service call which has below advantages and disadvantages
 * Pros:
 *  1. K8s service calls save the re-routing of the entire API call which takes it from load balancer -> auth -> ngnix -> to particular service
 *  2. Performance will be fast
 *  3. As the services will be inside one K8s so there will be no re-auth required between services
 *
 * Cons:
 *  1. Service name might over time
 *  2. Introduction of new service and naming convention
 */
