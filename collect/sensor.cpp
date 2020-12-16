#include <zmq.hpp>
#include <string>
#include <chrono>
#include <thread>
#include <iostream>
//#include "reading.hpp"

auto main(int argc, char* argv[]) -> int {
    using namespace std::chrono_literals;
    using namespace std::string_literals;

    if (argc == 1) {
        std::cout << "Usage: sensor <target_zone>" << std::endl;
    } 
    else {
        //  Socket to talk to server
        std::cout << "Reading sensor...\n" << std::endl;
    
        auto id = std::string(argv[1]);
        auto location = "{\n   lat: "+std::string(argv[2])+",\n   lng: "+std::string(argv[3])+"\n },";

        //  Prepare our context and publisher
        auto context = zmq::context_t(1);
        auto publisher = zmq::socket_t(context, zmq::socket_type::pub);
        publisher.connect("tcp://localhost:5559");

        while (true) {
            auto fluxo = 22;
            auto msg = "{\n id: "+id+",\n location: "+location+" \n}";

            std::cout << msg << std::endl << std::endl;
            //  Send message to all subscribers
            publisher.send(zmq::buffer(msg), zmq::send_flags::none);

            std::this_thread::sleep_for(400ms);
        }
    }

    return 0;
}
