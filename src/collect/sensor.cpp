#include <zmq.hpp>
#include <string>
#include <chrono>
#include <thread>
#include <iostream>
#include <random>
#include <functional>
//#include "reading.hpp"


auto distribution(double mean, double sd) -> int {//std::function<double()>{
    std::random_device rd{};
    std::mt19937 gen{rd()};
    std::normal_distribution<> d{mean, sd};
    return d(gen);
    //return [d, gen](){ return d(gen); }; 
}

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
        //auto flow = distribution(50, 10);
        auto status = "OK"s;
         
        //  Prepare our context and publisher
        auto context = zmq::context_t(1);
        auto publisher = zmq::socket_t(context, zmq::socket_type::pub);
        publisher.connect("tcp://localhost:5559");

        while (true) {
            auto flow = distribution(50, 10);

            auto msg = "{\n id: "s+id+",\n flow: "+std::to_string(flow)+",\n status: "+status+" \n}";

            std::cout << msg << std::endl << std::endl;
            //  Send message to all subscribers
            publisher.send(zmq::buffer(msg), zmq::send_flags::none);

            std::this_thread::sleep_for(1500ms);
        }
    }

    return 0;
}
