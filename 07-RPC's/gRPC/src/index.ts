import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// Load protobuf definition
const PROTO_PATH = path.join(__dirname, "./a.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Extract AddressBookService
const AddressBookService = protoDescriptor.AddressBookService;

// Mock data for persons
const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

// Implementation of RPC methods
function addPerson(
  call: grpc.ServerUnaryCall<{ name: string; age: number }, any>,
  callback: grpc.sendUnaryData<any>
) {
  const newPerson = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(newPerson);
  callback(null, newPerson);
}

function getPersonByName(
  call: grpc.ServerUnaryCall<{ name: string }, any>,
  callback: grpc.sendUnaryData<any>
) {
  const person = PERSONS.find((p) => p.name === call.request.name);
  if (person) {
    callback(null, person);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Person not found",
    });
  }
}

// Create and configure the gRPC server
const server = new grpc.Server();

server.addService(AddressBookService.service, {
  addPerson,
  getPersonByName,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Server binding failed:", err);
      return;
    }
    console.log(`Server is running on port ${port}`);
  }
);
